// 올바른 예시
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware 실행됨");
  console.log("쿠키 확인", request.cookies);
  return NextResponse.next();
}
