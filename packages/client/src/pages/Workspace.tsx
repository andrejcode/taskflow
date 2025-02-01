export default function Workspace() {
  return (
    // <div className="drawer flex-grow lg:drawer-open">
    //   <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    //   <div className="drawer-content flex flex-col items-center justify-center">
    //     {/* Page content here */}
    //     <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
    //       Open drawer
    //     </label>
    //     <h1>Workspace</h1>
    //   </div>
    //   <div className="drawer-side h-full">
    //     <label htmlFor="my-drawer" aria-label="Close sidebar" className="drawer-overlay"></label>
    //     <ul className="menu h-full w-64 bg-base-200 p-4 text-base-content">
    //       {/* Sidebar content here */}
    //       <li>
    //         <a>Sidebar Item 1</a>
    //       </li>
    //       <li>
    //         <a>Sidebar Item 2</a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <div className="drawer flex-grow lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* TODO: Add page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
        <h1>Title</h1>
      </div>
      <div className="drawer-side h-full">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu h-full w-60 bg-base-200 p-4 text-base-content">
          {/* TODO: Add sidebar content here */}
          <li>
            <span>Users</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// return (
//   <section className="h-full">
//     <div className="drawer lg:drawer-open">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content flex flex-col items-center justify-center">
//         {/* Page content here */}
//         <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
//           Open drawer
//         </label>
//       </div>
//       <div className="drawer-side">
//         <label
//           htmlFor="my-drawer-2"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
//           {/* Sidebar content here */}
//           <li>
//             <a>Sidebar Item 1</a>
//           </li>
//           <li>
//             <a>Sidebar Item 2</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//     <div className="mb-4 mt-5 flex items-center px-4 md:px-8 lg:mt-10 lg:px-16">
//       <label className="swap swap-rotate">
//         <input type="checkbox" />

//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="swap-off size-9"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
//         </svg>

//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="swap-on size-9"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
//         </svg>
//       </label>
//       <h1 className="ml-2 text-3xl">My Workspace</h1>
//     </div>
//   </section>
// );
