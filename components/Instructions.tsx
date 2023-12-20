const referencesLinks = {
  'Tailwind CSS Docs': 'https://tailwindcss.com/',
  'React hook form docs': 'https://react-hook-form.com/',
  'NextJS Testing': 'https://nextjs.org/docs/testing',
  Zod: 'https://zod.dev/',
  fusejs: 'https://fusejs.io/',
};

export function Instructions() {
  return (
    <>
      <ol className="list-decimal pl-5 ml-2 mt-5">
        <li>
          Clicking on toggle checkbox button should toggle checkbox state. <br />
          <code className="bg-purple-400">checkboxValue</code> and checkbox state should be two way synced
        </li>
        <li>
          Clicking on 'set input value' button should change input current value. <br />
          <code className="bg-green-400">textValue</code> and input state should be two way synced
        </li>
        <li>
          Input border bottom in focus state should change to green instead of blue when{' '}
          <code className="bg-cyan-400">customColorName</code> variable is green (changes on 'set green' button click)
        </li>
        <li>
          Checkbox and Input should implement <code>value</code> and <code>onChange</code> callbacks
        </li>
        <li>
          Implement react hook form:
          <ul className="list-disc pl-5">
            <li>Implement submit button and wrap everything in form</li>
            <li>
              Validate checkbox. required value: <code>true</code>.
            </li>
            <li>Validate Input value. minLength: 4, maxLength: 8, only latin letters</li>
            <li>Implement validation with Zod</li>
            <li>Show error messages only after submitting</li>
            <li>Make get request to `https://jsonplaceholder.typicode.com/posts`</li>
            <li>Show loader before http request and hide it after</li>
          </ul>
        </li>
        <li>
          Filter response by <code>title</code> using fusejs (implement hook) key based on input value and render it
        </li>
        <li>highlight matched characters using fusejs `includeMatches`</li>
        <li>Add typing</li>
        <li>Improve design - bonus</li>
        <li>Add jest testing - bonus</li>
      </ol>
      <h3 className="font-bold mt-2">References:</h3>
      <ul className="list-disc pl-5 text-blue-500 font-semibold">
        {Object.entries(referencesLinks).map(([text, url]) => (
          <li key={text}>
            <a className="underline hover:no-underline" href={url}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
