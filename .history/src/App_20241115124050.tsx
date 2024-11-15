import Layout from "./app/layout";
import { Button } from "./components/ui/button";

export function App() {


  return (
    <>
      <Layout children={undefined}></Layout>
      <Button>Hello World</Button>
    </>
  )
}