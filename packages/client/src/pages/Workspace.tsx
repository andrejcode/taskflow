export default function Workspace() {
  return (
    <>
      <h2 className="my-2 text-lg">Boards</h2>
      {/* TODO: Add boards content here */}

      <h2 className="mb-2 text-lg">Text Channels</h2>
      {/* TODO: Add text channels here */}

      <h2 className="mb-2 text-lg">Settings</h2>
      {/* TODO: Implement settings feature */}
      <div className="flex w-40 flex-col gap-2">
        <button className="btn btn-primary">Edit Workspace</button>
        <button className="btn btn-error">Delete Workspace</button>
      </div>
    </>
  );
}
