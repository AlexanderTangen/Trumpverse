import { DropdownItem } from './DropdownItem';

export interface DropdownProps {
    items: DropdownItem[]; 
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
