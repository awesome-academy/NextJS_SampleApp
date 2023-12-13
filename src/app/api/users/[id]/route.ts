import { NextResponse } from 'next/server';
import { showUser, updateUser } from './../../../lib/data';

export const GET = async(request: Request) => {
  const id = request.url.split('/').pop();  
  let res: any;

  if (id !== undefined && typeof id === 'string' && !isNaN(Number(id))) {
    const user = await showUser(parseInt(id));
    
    return NextResponse.json({message: "Success", data: user}, {status: 200})
  } else {
    const user = "Invalid parameter";
    return NextResponse.json({message: "Failed", data: []}, {status: 401})
  }
}

export const PUT = async(request: Request) => {
  const id = request.url.split('/').pop();
  const { name, date, age, school } = await request.json();
  let res: any;

  try {
    if (id !== undefined && typeof id === 'string' && !isNaN(Number(id))) {
      const user = await updateUser(parseInt(id), {name, date, age, school});
  
      return NextResponse.json({message: "Update success", data: user}, {status: 200})
    }
  } catch(err) {
    return NextResponse.json({message: "Update Failed"}, {status: 400})
  }
}
 