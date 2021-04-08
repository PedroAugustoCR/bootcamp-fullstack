import React, { Component } from 'react';
import { FiClipboard } from 'react-icons/fi';
import css from './input.module.css';

export default class Input extends Component {
  render() {
    const {
      handleChange = null,
      readOnly,
      value = null,
      placeholder = '',
      title = null,
      allowCopy = true,
    } = this.props;

    return (
      <div className={css.container}>
        {title ? (
          <p>
            <strong>{title}</strong>
          </p>
        ) : (
          ''
        )}
        {readOnly ? (
          <div>
            <input disabled type="text" value={value} className={css.input} />
            {allowCopy && (
              <button
                type="button"
                onClick={(event) =>
                  event.target.previousSibling.value
                    ? navigator.clipboard.writeText(
                        event.target.previousSibling.value
                      )
                    : alert('Nothing to copy!')
                }
              >
                <FiClipboard size={20} />
              </button>
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={css.input}
            />
            {allowCopy && (
              <button
                type="button"
                onClick={(event) =>
                  event.target.previousSibling.value
                    ? navigator.clipboard.writeText(
                        event.target.previousSibling.value
                      )
                    : alert('Nothing to copy!')
                }
              >
                <FiClipboard size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
