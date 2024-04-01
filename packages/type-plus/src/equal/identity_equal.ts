/**
 * This is a common equal check.
 * It is good for some basic cases, but not for all.
 */
export type IdentityEqual<A, B, Then, Else> = (<_>() => _ extends (A & _) | _ ? 1 : 2) extends <_>() => _ extends
	| (B & _)
	| _
	? 1
	: 2
	? Then
	: Else
