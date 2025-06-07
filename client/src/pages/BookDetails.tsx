import { useParams } from "react-router-dom";
import { bookData } from "@/data/bookData";
import type { Book } from "@/type/bookType";
import Header from "@/components/bookDetail/Header";
import AudioPlayer from "@/components/bookDetail/AudioPlayer";

function BookDetails() {
  const bookId = useParams().id;
  const book: Book | undefined = bookData.find((b) => b.id.toString() === bookId);

  return (
    <div className="w-4/5 mx-auto bg-card p-6 pb-24">
      <Header book={book} />
      <AudioPlayer book={book} />
    </div>
  )
}

export default BookDetails