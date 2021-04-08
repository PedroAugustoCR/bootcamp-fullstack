import React, { Component } from 'react';

import Input from './components/Input/Input';
import css from './index.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      userInput: '',
    };
  }

  render() {
    const { userInput } = this.state;

    const toCamelCase = (userInput) => {
      return (
        userInput.charAt(0).toLowerCase() +
        userInput
          .slice(1)
          .replace(/\W+(.)/g, (match, chr) => {
            return chr.toUpperCase();
          })
          .normalize('NFD')
          .replace(/[~´`^]/g, '')
      );
    };

    const onlyConsonants = (userInput) => {
      return userInput.replace(/[aeiouAEIOU]/g, '');
    };

    const onlyVowels = (userInput) => {
      return userInput.replace(/[^aeiouAEIOU]/g, '');
    };

    const toSlug = (userInput) => {
      return userInput
        .toLowerCase()
        .normalize('NFD')
        .replace(/[~´`^]/g, '')
        .replaceAll(' ', '-');
    };

    const toCsv = (userInput) => {
      return userInput
        .split(' ')
        .map((word) => (word ? `"${word}"` : ''))
        .join()
        .replaceAll(',', ';');
    };

    const toNumeric = (userInput) => {
      return userInput
        .toUpperCase()
        .normalize('NFD')
        .replace(/[~´`^]/g, '')
        .replace(/O|L|E|A|S|T/g, (match) => {
          switch (match) {
            case 'O':
              return '0';
            case 'L':
              return '1';
            case 'E':
              return '3';
            case 'A':
              return '4';
            case 'S':
              return '5';
            case 'T':
              return '7';
            default:
              break;
          }
        });
    };

    const toReverse = (userInput) => {
      return userInput.split('').reverse().join('');
    };

    const handleChange = (event) => {
      this.setState({ userInput: event.target.value });
    };

    return (
      <>
        <header className={css.container}>
          <h1>React Text Tranformer</h1>
          <Input
            handleChange={handleChange}
            readOnly={false}
            value={userInput}
            placeholder={'Digite um texto qualquer:'}
          />
        </header>

        <main className={css.container}>
          <Input
            readOnly={true}
            value={toReverse(userInput)}
            title={'To Reverse'}
          />
          <Input
            readOnly={true}
            value={toNumeric(userInput)}
            title={'To Numeric'}
          />
          <Input readOnly={true} value={toCsv(userInput)} title={'To Csv'} />
          <Input readOnly={true} value={toSlug(userInput)} title={'To Slug'} />
          <Input
            readOnly={true}
            value={onlyVowels(userInput)}
            title={'Only Vowels'}
          />
          <Input
            readOnly={true}
            value={onlyConsonants(userInput)}
            title={'Only Consonants'}
          />
          <Input
            readOnly={true}
            value={toCamelCase(userInput)}
            title={'To Camel Case'}
          />
        </main>
      </>
    );
  }
}
