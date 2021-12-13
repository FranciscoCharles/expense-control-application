import React from 'react';
import { StyledContent } from './style'
export function Content({ children }) {
	return (
		<StyledContent>
			{children}
		</StyledContent>
	);
}