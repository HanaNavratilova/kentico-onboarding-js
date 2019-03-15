import { ListItem } from '../models/ListItem';

const getErrorMessage = async (response: Response): Promise<any> => {
  const responseJson = await response.json();
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

    if (response.ok) {
      return await response.json();
    }

    return await getErrorMessage(response);
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

    return await getErrorMessage(response);
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};

export const editItem = async (id: Uuid, text: string): Promise<ListItem> => {
  try {
    const response = await fetch(
      'api/v1.0/List/' + id,
      {
        method: 'PUT',
        body: JSON.stringify({text}),
        headers: {'Content-Type': 'application/json'}
      });

    if (response.ok) {
      return await response.json();
    }

    return getErrorMessage(response);
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};
