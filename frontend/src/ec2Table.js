import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

const cellColors = {
    Critical: "#F04242",
    "Requires Attention": "#FAB15C",
    Offline: "#D9D9D9",
    Normal: "white",
    Remediated: "white",
};

const styles = (theme) => ({
    flexContainer: {
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        "& .ReactVirtualized__Table__headerRow": {
            flip: false,
            paddingRight:
                theme.direction === "rtl" ? "0 !important" : undefined,
        },
    },
    tableRow: {
        cursor: "pointer",
    },
    tableRowHover: {
        "&:hover": {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
        backgroundColor: "white",
    },
    noClick: {
        cursor: "initial",
    },
});

class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 40,
        rowHeight: 30,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        // console.log(cellData);
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{
                    height: rowHeight,
                    backgroundColor: cellColors[cellData],
                }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) ||
                    false
                        ? "right"
                        : "left"
                }
            >
                {cellData}
            </TableCell>
        );
    };

    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(
                    classes.tableCell,
                    classes.flexContainer,
                    classes.noClick
                )}
                variant="head"
                style={{ height: headerHeight, backgroundColor: "#F1FAFF" }}
                align={columns[columnIndex].numeric || false ? "right" : "left"}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const {
            classes,
            columns,
            rowHeight,
            headerHeight,
            ...tableProps
        } = this.props;
        // console.log("test------");
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: "inherit",
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        })
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = [
    ["ec2-12213-23232", "12-2-21", "North-America", 0, "Offline"],
    ["definitelyNotInfected", "22-3-15", "Your-Home-PC", 37, "Normal"],
    ["CryptoMiner", "30-2-12", "West-Europe", 2, "Critical"],
    ["KGBHideout", "6-9-76", "Washington-DC", 13, "Remediated"],
    ['the"Dark"Web', "2-3-04", "Sweden", 666, "Requires Attention"],
];

function createData(id, EC2name, dateCreated, location, users, ec2Status) {
    return { id, EC2name, dateCreated, location, users, ec2Status };
}

const rows = [];

for (let i = 0; i < 20; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
}

export default function ReactVirtualizedTable(name = "name") {
    return (
        <Paper style={{ height: 200, width: "100%" }}>
            <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                columns={[
                    {
                        width: 150,
                        label: "Name",
                        dataKey: "EC2name",
                    },
                    {
                        width: 120,
                        label: "Date Created",
                        dataKey: "dateCreated",
                    },
                    {
                        width: 120,
                        label: "Location",
                        dataKey: "location",
                    },
                    {
                        width: 120,
                        label: "Users Online",
                        dataKey: "users",
                        numeric: true,
                    },
                    {
                        width: 170,
                        label: "Status",
                        dataKey: "ec2Status",
                    },
                ]}
            />
        </Paper>
    );
}
