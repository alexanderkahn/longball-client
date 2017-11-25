import * as React from 'react';
import Button from 'material-ui/Button';

interface SaveDetailFooterProps {
    isEdit: boolean;
    onSave: () => void;
}

export function SaveDetailFooter(props: SaveDetailFooterProps) {
    return (
        <div>
            {props.isEdit &&
            <Button onClick={props.onSave}>Save</Button>
            }
        </div>
    );
}