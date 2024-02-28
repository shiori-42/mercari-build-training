import React, { useState } from 'react';

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';

interface Prop {
  onListingCompleted?: () => void;
}

type formDataType = {
  name: string,
  category_id: number,
  image: string | File,
}

export const Listing: React.FC<Prop> = (props) => {
  const { onListingCompleted } = props;
  const initialState: formDataType = {
    name: "",
    category_id: 0,
    image: "",
  };
  const [values, setValues] = useState<formDataType>(initialState);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values, [event.target.name]: event.target.value,
    })
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values, [event.target.name]: event.target.files![0],
    })
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData()
    data.append('name', values.name)
    data.append('category_id',values.category_id.toString())
    data.append('image', values.image)

    fetch(server.concat('/items'), {
      method: 'POST',
      mode: 'cors',
      body: data,
    })
      .then(response => {
        console.log('POST status:', response.statusText);
        onListingCompleted && onListingCompleted();
      })
      .catch((error) => {
        console.error('POST error:', error);
      })
  };
  return (
    <div className='Listing'>
      <form onSubmit={onSubmit}>
        <div>
          <input type='text' name='name' id='name' placeholder='name' onChange={onValueChange} required />
          <input type='text' name='category_id' id='category_id' placeholder='category_id' onChange={onValueChange} />
          <input type='file' name='image' id='image' onChange={onFileChange} required />
          <button type='submit'>List this item</button>
        </div>
      </form>
    </div>
  );
}
