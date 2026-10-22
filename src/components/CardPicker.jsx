import { useId } from 'react';
import { cardOptionsFor, effectForName } from '../data/cardData.js';

/* A text input backed by a <datalist> of the known card names for the current
   capture type + game combo. You get autocomplete/dropdown suggestions for
   cards we have data on, but can still type anything not listed (missing cards,
   promos, house stuff). When the typed name matches a known card, its effect
   text is shown beneath so you can confirm "what it does".

   Props:
     type     - capture type ('item-found', 'dark-power', 'finale', 'event', ...)
     combo    - { killerId, locationId } app ids
     value    - current text
     onChange - (text) => void
     placeholder, autoFocus, onKeyDown - passthrough to the input
*/
export default function CardPicker({
  type,
  combo,
  value,
  onChange,
  placeholder,
  autoFocus,
  onKeyDown,
}) {
  const listId = useId();
  const options = cardOptionsFor(type, combo || {});
  const effect = effectForName(type, value, combo);
  const known = options.length > 0;

  return (
    <span className="card-picker">
      <input
        className="turn-events__input"
        type="text"
        list={known ? listId : undefined}
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder || (known ? 'Pick or type a card name' : 'Type the card name')}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {known && (
        <datalist id={listId}>
          {options.map((o) => (
            <option key={o.id} value={o.name}>
              {o.effect ? o.effect.slice(0, 60) : ''}
            </option>
          ))}
        </datalist>
      )}
      {!effect && (
        <span className="card-picker__count">
          {known
            ? `${options.length} known card${options.length === 1 ? '' : 's'} to pick from — or type any name (e.g. a new expansion)`
            : 'No card list for this combo yet — just type the name'}
        </span>
      )}
      {effect && <span className="card-picker__effect">{effect}</span>}
    </span>
  );
}
