import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ complexity: 6 })
  @Column()
  firstName: string;

  @Field({ complexity: 6 })
  @Column()
  lastName: string;

  @Field({ complexity: 12 })
  @Column("text", { unique: true })
  email: string;

  // complexity -> user/name query complexity limiting
  @Field({ complexity: 6 })
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;
}
