import dynamic from 'next/dynamic'
import { CVBuilder as OGBuilder } from "./(components)/cv-builder";

const CVBuilder = dynamic(() => Promise.resolve(OGBuilder), {
  ssr: false
})

export default function Editor() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 to-emerald-300">
      <CVBuilder />
    </div>
  );
}
