export const SortIconDown = () => {
  return (
    <svg
      style={{ color: "white" }}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      fill="currentColor"
      className="bi bi-caret-down-fill"
      viewBox="0 0 16 16"
    >
      {" "}
      <path
        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
        fill="white"
      ></path>{" "}
    </svg>
  );
};

export const SortIconUp = () => {
  return (
    <svg
      style={{ color: "white" }}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      fill="currentColor"
      className="bi bi-caret-up-fill"
      viewBox="0 0 16 16"
    >
      {" "}
      <path
        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
        fill="white"
      ></path>{" "}
    </svg>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
};
