import { redirect } from "next/navigation";

export default function RootPage() {
  // Assim que o usuário bater na raiz do site, ele é jogado para a rota /home
  redirect("/home");
}