import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// O nome da função agora obrigatoriamente é proxy
export function proxy(request: NextRequest) {
  // Lógica do seu proxy (redirecionamentos, checagem de auth do Firebase, etc)
  return NextResponse.next()
}

// O config continua igual
export const config = {
  matcher: ['/dashboard/:path*', '/perfil/:path*'],
}