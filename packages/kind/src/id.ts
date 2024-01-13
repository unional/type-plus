import type { Fn } from './fn.js'

export interface Id extends Fn {
	output: this['input']
}