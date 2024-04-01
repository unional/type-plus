export interface Fn {
	input: [unknown, unknown]
	output: [unknown, unknown]
}

export type Eval<Input, Fns extends Fn[]> = Pipe<[Input, unknown], Fns>[0]

export type Pipe<Input extends [unknown, unknown], Fns extends Fn[]> = Fns extends [
	infer H extends Fn,
	...infer Rest extends Fn[]
]
	? Pipe<
			(H & {
				input: Input
			})['output'],
			Rest
		>
	: Input
