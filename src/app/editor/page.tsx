import dynamic from 'next/dynamic'
import { CVBuilder } from "./(components)/cv-builder";

const CVBuilderNoSSR = dynamic(() => Promise.resolve(CVBuilder), {
  ssr: false
})

export default function Editor() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 to-teal-500">
      <CVBuilderNoSSR />
    </div>
  );
}
