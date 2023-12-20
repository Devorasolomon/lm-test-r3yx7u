'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { Loader } from '@/components/Loader';
import { Instructions } from '@/components/Instructions';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useFuseSearch } from '@/components/useFuseSearch';

interface IFormInput {
  checkbox: boolean;
  input: string;
}

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const methods = useForm();

  const [textValue, setTextValue] = useState('init');
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [customColorName, setCustomColorName] = useState('blue');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [result, setSearchResults] = useState([]);

  const { searchResults, handleSearch } = useFuseSearch(posts, 'title', {
    keys: ['title'],
    includeScore: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const schema = z.object({
    checkbox: z.boolean().refine((val) => val === true, {
      message: 'Checkbox is required',
      path: ['checkbox'],
    }),
    input: z
      .string()
      .min(4, 'Input must be at least 4 characters')
      .max(8, 'Input must be at most 8 characters')
      .regex(/^[A-Za-z]+$/, 'Only Latin letters allowed'),
  });

  const toggleCheckbox = () => {
    setCheckboxValue((prevValue) => !prevValue);
  };

  const handleInputChange = (value: any) => {
    setTextValue(value);
    handleSearch(value);
  };

  const onSubmit = async (data: any) => {
    try {
      schema.parse(data);
      setLoading(true);

      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const responseData = await response.json();
      console.log(responseData);
      console.log('Form data:', data);
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const highlightMatchedText = (text: string) => {
    if (!textValue || !text || searchResults.length === 0) {
      return text;
    }

    const matches = searchResults.find((result) => result.title === text)?.matches;

    if (matches && matches.length > 0) {
      let highlightedText = '';
      let lastIndex = 0;

      matches.forEach((match: any) => {
        const [start, end] = match.indices[0];
        highlightedText += text.substring(lastIndex, start);
        highlightedText += `<mark>${text.substring(start, end + 1)}</mark>`;
        lastIndex = end + 1;
      });

      highlightedText += text.substring(lastIndex);
      return highlightedText;
    }

    return text;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2">
        <div className="flex flex-col gap-2 my-2 ml-1">
          <div>
            <code className="bg-cyan-400">customColorName</code> = "{customColorName}"
          </div>
          <div>
            <code className="bg-green-400">textValue</code> = "{textValue}"
          </div>
          <div>
            <code className="bg-purple-400">checkboxValue</code> = {checkboxValue ? 'true' : 'false'}
          </div>
        </div>
        <div className="flex gap-3 my-3 items-center justify-center">
          <button onClick={() => setCustomColorName('green')} className="bg-slate-300 rounded-md p-1.5">
            set green
          </button>
          <button onClick={() => setCustomColorName('blue')} className="bg-slate-300 rounded-md p-1.5">
            set blue
          </button>

          <button onClick={() => setTextValue('new value')} className="bg-slate-300 rounded-md p-1.5">
            set input value
          </button>
          {/* This button should toggle checkbox state */}
          <button onClick={toggleCheckbox} className="bg-slate-300 rounded-md p-1.5">
            <span className="bg-yellow-300">TODO: toggle checkbox</span>
          </button>
        </div>

        <div className="flex flex-col gap-5 mb-3 justify-center">
          <Checkbox color={customColorName} checked={checkboxValue} register={register} onChange={toggleCheckbox}>
            Tests
          </Checkbox>
          {errors.checkbox && <p>Checkbox is required</p>}
          <Input
            value={textValue}
            color={customColorName}
            register={register}
            onChange={handleInputChange}
            id="input"
          />
          {errors.input && <p>{errors.input.message}</p>}
          <div className="flex justify-center gap-2">
            <button type="submit" className="bg-slate-300 rounded-md p-1.5">
              <span className="bg-yellow-300">Submit</span>
            </button>
            {loading && <Loader />}
          </div>
          <div className="font-bold text-center">Results:</div>
          <div className="text-center">
            <span className="bg-yellow-300">
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {searchResults.map(
                  (item) =>
                    item?.title && (
                      <li
                        key={item?.id}
                        style={{ marginBottom: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      >
                        {item?.title && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.title.replace(
                                new RegExp(`(${textValue})`, 'gi'),
                                '<mark style="background-color: yellow">$1</mark>'
                              ),
                            }}
                          />
                        )}
                      </li>
                    )
                )}
              </ul>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
