export default function CustomerSidebar() {
  const navElements = [
    { title: "Dashboard", link: "", iconeLink: "" },
    { title: "Book Parcel", link: "", iconeLink: "" },
    { title: "My Parcels", link: "", iconeLink: "" },
    { title: "Live Tracking", link: "", iconeLink: "" },
    { title: "Payments", link: "", iconeLink: "" },
    { title: "Profile", link: "", iconeLink: "" },
  ];

  const navRender = navElements.map((element) => {});

  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <ul>
        <li>Dashboard</li>
        <li>Users</li>
        <li>Settings</li>
      </ul>
    </nav>
  );
}
