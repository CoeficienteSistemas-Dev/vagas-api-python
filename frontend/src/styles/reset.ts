import styled, { css, createGlobalStyle, keyframes } from 'styled-components';

export default createGlobalStyle`
  .white-text {
    color: #fff;

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html, body {
    outline: none;
    background-color: hsl(204, 25%, 92%);
    font-family: 'Ubuntu', sans-serif;
    font-size: 18px;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    overflow-x: hidden;
    @media(max-width: 2000px) {
      font-size: 14px;
    }

    @media(max-width: 1600px) {
      font-size: 12px;
    }
    @media(max-width: 1400px) {
      font-size: 12px;
    }
  }

  body {
    position: relative;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;

    > #root {
      display: flex;
      width: 100vw;
      height: 100vh;
       table {
          tbody > tr:nth-of-type(1) {
            > td:nth-of-type(1),
            > td:nth-of-type(2) {
              font-weight: bold !important;
              color: #162f71;
            }
          }
        }
    }
  }


  input, button, textarea, select {
    font-family: 'Ubuntu', sans-serif;
    font-size: 1rem;
    border: 0;
    &:focus {
      outline: none;
    }
  }

  button {
    cursor: pointer;
  }

  th, span, strong {
    font-weight: normal!important;
  }


  a, li, ul {
    color:inherit;
    text-decoration: none;
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6, strong, span {
    user-select: none;
  }

  h1, h2, h3, h4, h5, h6, strong, span {
    font-weight: 500;
  }

`;

export const fadeIn = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-20px);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const fadeInLeft = keyframes`
  0% {
      opacity: 0;
      transform: translateX(-40px);
  }
  100% {
      opacity: 1;
      transform: translateX(0);
  }
`;

export const fadeInRight = keyframes`
  0% {
      opacity: 0;
      transform: translateX(40px);
  }
  100% {
      opacity: 1;
      transform: translateX(0);
  }
`;

const statusColors = ['#707070', '#34C252', '#FAE15C', '#C22215', '#C35300'];
export const StatusRow = styled.span<{ code: number }>`
  color: ${({ code }) => {
    if (code >= 100 && code <= 199) return statusColors[0];
    if (code >= 200 && code <= 299) return statusColors[1];
    if (code >= 300 && code <= 399) return statusColors[2];
    if (code >= 500 && code <= 599) return statusColors[4];
    return statusColors[3];
  }};

  background-color: ${({ code }) => {
    if (code >= 100 && code <= 199) return statusColors[0];
    if (code >= 200 && code <= 299) return statusColors[1];
    if (code >= 300 && code <= 399) return statusColors[2];
    if (code >= 500 && code <= 599) return statusColors[4];
    return statusColors[3];
  }}20;
  border-radius: 6px;
  padding: 4px;
  text-align: center;
  font-weight: bold !important;
`;
interface BtnProps {
  customColor?: number;
  hexColor?: string;
  size?: string;
}

const colorBtn = ['#4c87c2', '#375fc4', '#254085'];

export const DefButton = styled.button<BtnProps>`
  height: 50px;
  ${({ size }) =>
    size !== undefined &&
    css`
      height: ${size};
    `}
  min-width: 125px;
  max-width: 200px;
  padding: 4px 6px;

  border-radius: 12px;
  text-align: center;

  color: #fff;
  font-size: 1.5rem;
  border: 0;
  background-color: ${colorBtn[0]};
  ${({ customColor }) =>
    customColor !== undefined &&
    css`
      background-color: ${colorBtn[customColor]};
    `}
  ${({ hexColor }) =>
    hexColor !== undefined &&
    css`
      background-color: ${hexColor};
    `}

  transition: filter 0.5s ease;
  &:hover {
    filter: brightness(125%);
  }
`;

export const Column = styled.div<{ hidden?: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: opacity 0.5s ease;

  ${({ hidden }) =>
    hidden === true &&
    css`
      opacity: 0;
      pointer-events: none;
      user-select: none;
    `}
`;

export const Row = styled.div`
  display: flex;
`;

export const InputTitle = styled.span`
  color: #254085;
  font-size: 1.125rem;
  margin-bottom: 8px;
  transition: color 0.5s ease;
`;

export const DefInputCheckbox = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.1rem;
  height: 35px;
  color: #707070;

  > input {
    margin-right: 8px;
  }
`;

export const DefaultInput = styled.input<{ noHover?: boolean }>`
  color: #707070;
  background-color: #fff;
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  font-size: 1rem;

  padding: 8px 12px;

  height: 35px;
  width: 100%;
  transition: border-color 0.5s ease;

  ${({ noHover }) =>
    !noHover &&
    css`
      &:focus {
        border-color: #375fc4;
      }
    `}
`;

export interface ColumnStylesTable {
  width?: string;
  maxWidth?: string;
  flex?: string;
  mainColumn?: boolean;
  isActions?: boolean;
  justify?: 'flex-start' | 'flex-end'; // Default Center
}

interface DefTableProps {
  columnStyle: ColumnStylesTable[];
}

export const DefTable = styled.table<DefTableProps>`
  border: none;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #aeaeae29;

  display: flex;
  flex-direction: column;

  // Check this
  width: 100%;
  max-width: 100%;
  // Check this

  thead {
    display: flex;

    tr {
      display: flex;
      width: 100%;
      border-bottom: 1px solid #b7b7b7;

      th {
        padding: 10px 12px;
        color: #254085;
        font-size: 1.125rem;
        display: flex;
        align-items: center;
        justify-content: center;

        ${({ columnStyle }) =>
          columnStyle.map(
            (item, index) => css`
              &:nth-child(${index + 1}) {
                > input {
                  margin-right: 8px;
                }

                ${item.justify && `justify-content: ${item.justify};`}
                ${item.width && `width: ${item.width};`}
                ${item.maxWidth && `max-width: ${item.maxWidth};`}
                ${item.flex && `flex: ${item.flex};`}
                ${item.mainColumn &&
                css`
                  flex: 1;
                  justify-content: flex-start;
                `}
              }
            `,
          )}
      }
    }
  }

  tbody {
    display: flex;
    flex-direction: column;

    tr {
      display: flex;
      animation: ${fadeIn} 0.5s ease forwards normal;

      + tr {
        border-top: 1px solid #e5e5e5;
      }

      td {
        display: flex;
        align-items: center;

        padding: 10px 12px;
        color: #707070;
        font-size: 1rem;
        + td {
          border-left: 1px solid #e5e5e5;
        }
        > span,
        > span > span {
          width: 100%;
        }

        justify-content: center;

        ${({ columnStyle }) =>
          columnStyle.map(
            (item, index) => css`
              &:nth-child(${index + 1}) {
                ${item.justify && `justify-content: ${item.justify};`}
                ${item.width && `width: ${item.width};`}
                ${item.maxWidth && `max-width: ${item.maxWidth};`}
                ${item.flex && `flex: ${item.flex};`}
                ${item.mainColumn &&
                css`
                  flex: 1;
                  justify-content: flex-start;
                `}
                ${item.isActions &&
                css`
                  > * + * {
                    margin-left: 12px;
                  }

                  svg {
                    cursor: pointer;
                    color: #bcbcbb;
                    .a {
                      fill: #bcbcbb;
                    }
                    width: 24px;
                    height: 24px;

                    transition: filter 0.5s ease;

                    &:hover {
                      filter: brightness(75%);
                    }
                  }
                `}
              }
            `,
          )}

        &.emptyTable {
          flex: 1;
          width: 100%;
          max-width: unset;

          > strong {
            padding: 16px;
            color: #254085;
            margin: auto;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;
