import type { $ResolveBranch } from './$resolve_branch.js'
import type { $SelectionOptions } from './$selection_options.js'
import type { $Else, $Then } from './selection.js'

export type $ResolveSelection<$O extends $SelectionOptions, T, Branch extends $Then | $Else> =
	Branch extends $Then ? $ResolveBranch<$O['selection'] extends 'filter' ? T : true, $O, [$Then]>
	: (
		Branch extends $Else ? (
			$ResolveBranch<$O['selection'] extends 'filter'
				? never
				: false, $O, [$Else]>
		)
		: never
	)
