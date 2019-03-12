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


export const deleteItem = (id: Uuid): Promise<void> =>
  fetch('api/v1.0/List/' + id,
    {
      method: 'DELETE'
    }).then(response => {
    if (response.ok) {
      return;
    }

    throw new Error();
  });
