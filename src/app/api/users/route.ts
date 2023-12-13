import { addUsers } from './../../lib/data';
import { NextResponse } from 'next/server';
import { getUsers } from "@/app/lib/data";

export function GET(request: Request) {
  let res = getUsers();
  return NextResponse.json({message: "OK", data: res}, {status: 200});
}

export const POST = async(request: Request) => {
  const {name, age, school} = await request.json();
  let res = getUsers();
  let cnt: number = 0;
  if (res.length === 0) {
    cnt = 1;
  } else {
    cnt = res.length + 1;
  }

  try {
    let user = {id: cnt, name, date: new Date(), age, school, graduated: school.length !== 0};
    addUsers(user);
    res = getUsers();
    return NextResponse.json({message: "Create Success", data: res}, {status: 200})
  } catch (err) {
    console.log(err);
  }
}
