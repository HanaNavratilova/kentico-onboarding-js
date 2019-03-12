import { ListItem } from '../models/ListItem';

export const storeItem = (itemText: string): Promise<ListItem> =>
  fetch('api/v1.0/List', {
    method: 'POST',
    body: JSON.stringify({text: itemText}),
    headers: {'Content-Type': 'application/json'}
  }).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error();
  });


export const fetchItems = (): Promise <ListItem[]> =>
  fetch('api/v1.0/List', {method: 'GET'})
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    });



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
