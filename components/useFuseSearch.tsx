import { useEffect, useState, useMemo } from 'react';
import Fuse from 'fuse.js';

interface DataItem {
  id: number;
  title: string;
}

export const useFuseSearch = (data: DataItem[], searchKey: keyof DataItem, options: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DataItem[]>(data);
  const fuse = useMemo(() => new Fuse<DataItem>(data, options), [data, options]);

  useEffect(() => {
    const results = searchTerm ? fuse.search(searchTerm) : data;
    setSearchResults(results.map((result: Fuse.FuseResult<DataItem>) => result.item));
  }, [data, fuse, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return { searchResults, handleSearch };
};
