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
