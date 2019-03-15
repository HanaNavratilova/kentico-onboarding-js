import { ListItem } from '../models/ListItem';

const validateResponse = async (response: Response): Promise<ListItem> => {
  const responseJson = await response.json();

  if (response.ok) {
    return responseJson;
  }

  let errorMessage = '';
  const error = responseJson.modelState;
  Object.keys(error).forEach((key) => {
    errorMessage += error[key][0];
  });

  return Promise.reject(new Error(errorMessage));
};

export const storeItem = async (itemText: string): Promise<ListItem> => {
  try {
    const response = await fetch('api/v1.0/List', {
      method: 'POST',
      body: JSON.stringify({text: itemText}),
      headers: {'Content-Type': 'application/json'}
    });

    return await validateResponse(response);
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};


export const fetchItems = async (): Promise<ListItem[]> => {
  try {
    const response = await fetch(
      'api/v1.0/List',
      {method: 'GET'}
    );

    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('This should never happen! Something went really wrong.'));
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};

export const deleteItem = async (id: Uuid): Promise<void> => {
  try {
    const response = await fetch('api/v1.0/List/' + id,
      {
        method: 'DELETE'
      });

    if (response.ok) {
      return;
    }

    const responseJson = await response.json();

    let errorMessage = '';
    const error = responseJson.modelState;
    Object.keys(error).forEach((key) => {
      errorMessage += error[key][0];
    });

    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};

export const editItem = (id: Uuid, text: string): Promise<ListItem> =>
  fetch(
    'api/v1.0/List/' + id,
    {
      method: 'PUT',
      body: JSON.stringify({text}),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    });

