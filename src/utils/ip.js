import { NextResponse, NextRequest } from 'next/server'
const dev_server = ['localhost:3001'];

export async function IP(request) {
  const headers = new Headers(NextRequest.headers)
  console.log(headers, 'headersIP');
  let ip = headers.get('x-forwarded-for') && headers.get('x-forwarded-for').split(',')[0] || '217.165.59.84';
  if (dev_server.indexOf(headers.get('host')) >= 0) {
    ip = '217.165.59.84';
  }
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}geolocation?geo=&client_ip=${ip}`)
  const data = await res.json()
  

  return data; //NextResponse.json({ product })
}