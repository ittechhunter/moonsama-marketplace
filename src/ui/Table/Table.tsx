import { ReactNode, useState, createContext, useContext } from 'react';
import MaterialTable, { TableProps } from '@material-ui/core/Table';
import MaterialTableBody, { TableBodyProps } from '@material-ui/core/TableBody';
import MaterialTableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead, { TableHeadProps } from '@material-ui/core/TableHead';
import MaterialTableRow, { TableRowProps } from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';
import { tableStyles } from './Table.styles';

const TableContext = createContext<{ isExpandable?: boolean }>({});

export const TableCell = ({ children, ...props }: TableCellProps) => {
  return <MaterialTableCell {...props}>{children}</MaterialTableCell>;
};

export const TableRow = ({
  children,
  renderExpand,
  ...props
}: TableRowProps & { renderExpand?: () => ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isExpandable } = useContext(TableContext);

  const { rowInfo } = tableStyles();

  return (
    <>
      <MaterialTableRow {...props}>
        {isExpandable && (
          <TableCell>
            {renderExpand && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <KeyboardArrowUpIcon style={{ fill: '#d2023e' }} />
                ) : (
                  <KeyboardArrowDownIcon style={{ fill: '#d2023e' }} />
                )}
              </IconButton>
            )}
          </TableCell>
        )}
        {children}
      </MaterialTableRow>
      {isExpandable && renderExpand && (
        <MaterialTableRow className={rowInfo}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell>
          <TableCell
            style={
              !open ? { paddingBottom: 0, paddingTop: 0 } : { padding: '2rem' }
            }
            colSpan={7}
          >
            {/* borderBottom: 'unset' */}
            <Collapse in={open} timeout="auto" unmountOnExit>
              {renderExpand()}
            </Collapse>
          </TableCell>
        </MaterialTableRow>
      )}
    </>
  );
};

export const TableHeader = ({ children, ...props }: TableHeadProps) => {
  return <TableHead {...props}>{children}</TableHead>;
};

export const TableBody = ({
  children,
  ...props
}: TableBodyProps & { isExpandable?: boolean }) => {
  return <MaterialTableBody {...props}>{children}</MaterialTableBody>;
};

export const Table = ({
  children,
  isExpandable,
  ...props
}: TableProps & { isExpandable?: boolean }) => {
  return (
    <TableContainer
      component={Paper}
      style={{
        borderRadius: 0,
      }}
    >
      <MaterialTable {...props} size="medium">
        <TableContext.Provider value={{ isExpandable }}>
          {children}
        </TableContext.Provider>
      </MaterialTable>
    </TableContainer>
  );
};
