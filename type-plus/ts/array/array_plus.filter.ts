export type Filter<A extends unknown[], Criteria> = A[0] extends Criteria
	? A
	: Criteria extends A[0]
	? Array<Criteria>
	: never[]
