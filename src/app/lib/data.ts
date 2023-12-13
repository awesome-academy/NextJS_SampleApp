type Person = {
  id: number,
  name: string,
  date: Date,
  age: number,
  school: string,
  graduated: boolean
}

let users: Person[] = [];

for (let i = 0; i <= 5; i++) {
  let user = {
    id: i + 1,
    name: `Nguyen Van Ri Do ${i}`,
    date: new Date(),
    age: 20 + i,
    school: i % 2 == 0 ? "UET" : "ULIS",
    graduated: i % 2 == 0,
  }
  users.push(user);
}

export const getUsers = () => users;

export const addUsers = (person: Person) => {
  users.push(person);
}

export const showUser = (id: number) => {
  const user = users.find((user) => user.id === id);
  return user;
}

export const updateUser = (id: number, params: any) => {
  let user = users.find((user) => user.id === id);
  
  const { name, date, age, school } = params;
  console.log(school);  
  if (user) {
    user = {...user, 
              name: name ?? user.name, 
              date: date ?? user.date, 
              age: age ?? user.age, 
              school: school ?? user.school
           }
    return user;
  } else {
    throw new Error("Cannot find user");
  }
}
