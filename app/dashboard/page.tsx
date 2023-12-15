import Dropzone from "@/components/Dropzone"
import TableWrapper from "@/components/table/TableWrapper"
import { db } from "@/firebase"
import { FileType } from "@/typings"
import { auth } from "@clerk/nextjs"
import { collection, getDocs } from "firebase/firestore"

export default async function Dashboard() {
    const { userId } = auth()

    const docsResults = await getDocs(collection(db, "users", userId!, "files"))
    const skeletonFiles: FileType[] = docsResults.docs.map((doc) => {
      return {
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName,
        downloadURL: doc.data().downloadURL,
        type: doc.data().type,
        size: doc.data().size
      }
    })


  return (
    <div>
        <Dropzone />

        <section className="container space-y-5">
          <h2 className="font-bold">All Files</h2>
          <TableWrapper skeletonFiles={skeletonFiles}/>
          <div></div>
        </section>
    </div>
  )
}
