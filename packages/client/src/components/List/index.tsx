import ListItem from './ListItem';

interface ListProps<T> {
  items: T[] | null;
  listName: string;
  getKey: (item: T) => string | number;
  getTitle: (item: T) => string;
  onClick: (item?: T) => void;
}

export default function List<T>({ items, listName, getKey, getTitle, onClick }: ListProps<T>) {
  return (
    <>
      {items?.length === 0 && <p className="mb-3">There are no {listName}.</p>}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ListItem title="Create Workspace" variant="secondary" onClick={() => onClick()} />

        {items &&
          items.map((item) => (
            <ListItem key={getKey(item)} title={getTitle(item)} onClick={() => onClick(item)} />
          ))}
      </ul>
    </>
  );
}
