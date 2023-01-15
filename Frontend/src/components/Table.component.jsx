import { Fragment, useState } from "react";
import RowTable from "./Row.component";
import UserEditPopup from "./UserEditPopup/UserEditpopup";

const UsersTable = () => {
  const originalUsersArr = [
    {
      name: "Idan",
      password: "awjdawvcta",
      email: "idan10@gmail.com",
      id: 1,
      key: 44,
    },
    {
      name: "Kate",
      password: "12atfrcwd13",
      email: "kate.work@gmail.com",
      id: 2,
      key: 45,
    },
    {
      name: "Dani",
      password: "1kljhyk",
      email: "dani88@gmail.com",
      id: 3,
      key: 46,
    },
    {
      name: "Avi",
      password: "ouiouyok176",
      email: "avi1998@gmail.com",
      id: 4,
      key: 47,
    },
  ];

  const [usersArr, setUsers] = useState(originalUsersArr);

  const handleUser = (id) => {
    let newUsersArr = usersArr.filter((item) => item.id !== id);

    setUsers(newUsersArr);
  };

  const handleEditUser = (id) => {
    /*   let newUserArr = usersArr.filter((item) => {
      return item.id === id;
    });

    if (newUserArr.length > 0) {
      setSelectedUser(...newUserArr[0]);
    } */

    let newUser = usersArr.find((item) => {
      return item.id === id;
    });
    //! newUser.name = "11111";
    //! console.log("userArr",userArr)
    if (newUser) {
      setSelectedUser({ ...newUser });
    }

    console.log("id to be edit ", id);
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUpdateUser = (name, email, password, id) => {
    // copy by reference
    // let newUserArr = [...usersArr]
    // by copy
    let newUserArr = usersArr.map((item) => {
      return { ...item };
    });
    let newUser = newUserArr.find((item) => {
      return item.id === id;
    });
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    setUsers(newUserArr);
    setSelectedUser(null);
  };

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Password</th>
            <th scope="col">Email</th>
            <th scope="col">Delete/Edit</th>
          </tr>
        </thead>
        <tbody>
          {usersArr.map((user) => {
            return (
              <RowTable
                name={user.name}
                password={user.password}
                email={user.email}
                id={user.id}
                key={user.key}
                onDeleteUser={handleUser}
                onEdit={handleEditUser}
              ></RowTable>
            );
          })}
        </tbody>
      </table>
      {selectedUser !== null && (
        <UserEditPopup
          name={selectedUser.name}
          email={selectedUser.email}
          password={selectedUser.password}
          id={selectedUser.id}
          onUpdateUser={handleUpdateUser}
        ></UserEditPopup>
      )}
    </Fragment>
  );
};

export default UsersTable;
