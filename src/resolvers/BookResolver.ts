import {Resolver, Query, Mutation, Arg, UseMiddleware} from "type-graphql";
import {Book} from "../entity/Book";
import {CreateBookInput} from "../inputs/CreateBookInput";
import {UpdateBookInput} from "../inputs/UpdateBookInput";
import {isAuth} from "../ultis/isAuth";

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  books() {
    return Book.find()
  }

  @Query(() => Book)
  book(@Arg("id") id: string) {
    return Book.findOne({where: {id}})
  }


//   TODO: Add a mutation to create a new book
  @Mutation(() => Book)
  @UseMiddleware(isAuth)
  async createBook(
    // @Arg("title") title: string,
    // @Arg("author") author: string,
    // @Arg("description") description: string
    @Arg("data", {validate: false}) data: CreateBookInput
  ) {
    const book = Book.create(data)
    await book.save()
    return book
  }

  //   TODO: Add a mutation to update a book
  @Mutation(() => Book)
  async updateBook(
    @Arg("id") id: string,
    @Arg("data", {validate: false}) data: UpdateBookInput
  ) {
    const book = await Book.findOne({where: {id}})
    if (!book) throw new Error("Book not found!")
    Object.assign(book, data)
    await book.save()
    return book
  }

  //   TODO: Add a mutation to delete a book
  @Mutation(() => Boolean)
  async deleteBook(@Arg("id") id: string) {
    const book = await Book.findOne({where: {id}})
    if (!book) throw new Error("Book not found!")
    await book.remove()
    return true
  }
}
