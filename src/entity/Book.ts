import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ObjectType, Field, ID} from "type-graphql";

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: String;

  @Field(() => String)
  @Column()
  title: String;

  @Field(() => String)
  @Column()
  author: String;

  // @Field(() => String)
  // @Column()
  // description: String;

  @Field(() => Boolean)
  @Column({default: false})
  isPublished: Boolean;
}
