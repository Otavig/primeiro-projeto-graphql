import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Appointment {
    @Field()
    startsAt: Date; // Nome correto

    @Field()
    endsAt: Date;
}
