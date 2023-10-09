import type { $ResolveBranch } from './$resolve_branch.js'
import type { $SelectionOptions } from './$selection_options.js'
import type { $Else, $Then } from './selection.js'

export type $ResolveSelection<$O extends $SelectionOptions, T, Branch extends $Then | $Else> =
	Branch extends $Then ? $ResolveBranch<$O, [$Then], $O['selection'] extends 'filter' ? T : true>
	: (
		Branch extends $Else ? (
			$ResolveBranch<$O, [$Else], $O['selection'] extends 'filter'
				? never
				: false>
		)
		: never
	)
