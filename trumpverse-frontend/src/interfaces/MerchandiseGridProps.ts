import { MerchandiseItem } from './MerchandiseItem';

export interface MerchandiseGridProps {
  items: MerchandiseItem[];
  onActionClick?: (item: MerchandiseItem) => void;
  actionButtonLabel?: string;
  actionButtonClassName?: string;
  enableDetailLink?: boolean;
}
