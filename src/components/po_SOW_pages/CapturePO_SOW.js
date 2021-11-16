import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import '../po_SOW_pages/CapturePO_SOW.css';
import SOWs_data from "../../Data.json";

// materialUI stylings for select dropdowns.
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
// test data
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
    "John dave"
];
const projects = ['project1', 'project2'];
const clientFinController = ["ABC", "XYZ", "EFG"];
const targetedResources = ["ABC", "XYZ", "EFG", "ABC",]
const clientSponsors = ["ABC", "XYZ"];
const types = ["PO", "SOW"];
const currencies = ["INR", "USD"];
const DocumentTypes = ["docx", "pdf", "excel"]



export const CapturePO_SOW = (props) => {

    const theme = useTheme();
    const params = useParams();
    let filteredArr = SOWs_data.posts.filter((data) => { return data.id == params.id });
    // console.log(filteredArr);
    // hooks for text boxes and dropdowns and textboxes
    let savedPersonName="";
    if(props.editBtn){savedPersonName=filteredArr[0].clientname}
    const [personName, setPersonName] = React.useState(savedPersonName);
    const [projectName, setProjectName] = React.useState("");
    const [typeName, setTypeName] = React.useState("");
    const [CurrName, setCurrName] = React.useState("");
    const [DocTypes, setDocTypes] = React.useState("");
    const [remarks, setRemarks] = React.useState("");
    const [PO_number, setPO_number] = React.useState("");
    const [PO_amt, setPOAmt] = React.useState("");
    const [DocName, setDocName] = React.useState("");
    const [uploadFile, setUploadFile] = React.useState();
    const [editTglCheckedState, seteditTglCheckedState] = React.useState(props.toggleState);

    const handleClientChange = (event) => {
        setPersonName(
            event.target.value
        );
    };
    const handleProjectChange = (event) => {
        setProjectName(
            event.target.value
        );
    };
    const handleTypeChange = (event) => {
        setTypeName(
            event.target.value
        );
    };
    const handleCurrencyChange = (event) => {
        setCurrName(
            event.target.value
        );
    };
    const handleDocTypesChange = (event) => {
        setDocTypes(event.target.value);
    }
    const handleRemarksChange = (event) => {
        setRemarks(event.target.value)
    }
    const handlePoNumTxtBoxChange = (event) => {
        setPO_number(event.target.value);
    }
    const handlePOAmtTxtBoxChange = (event) => {
        if (!isNaN(Number(event.target.value))) {
            setPOAmt(event.target.value)
        }
        if (isNaN(Number(event.target.value))) {
            setPOAmt(PO_amt)
        }
    }
    const handleEditTglChange = (e) => {
        seteditTglCheckedState(!editTglCheckedState);

    }
    const handleUploadChange = (e) => {
        setUploadFile(e.target.files[0]);
        setDocName(e.target.files[0].name)
    }
    // console.log(uploadFile)
    // hooks for checkboxes
    const [ClientSponsorCheckedState, setClientSponsorCheckedState] = useState(new Array(clientSponsors.length).fill(false));
    const handleClientOnChange = (position) => {
        const updatedCheckedState = ClientSponsorCheckedState.map((item, index) =>
            index === position ? !item : item
        );
        setClientSponsorCheckedState(updatedCheckedState);
    }
    const [clientFinanceController, setClientFinanceController] = useState(new Array(clientFinController.length).fill(false));
    const handleClientfinChkBoxOnChange = (position) => {
        const updatedCheckedState = clientFinanceController.map((item, index) =>
            index === position ? !item : item
        );
        setClientFinanceController(updatedCheckedState);
    }
    let userTargetResCheckedElems = new Array(targetedResources.length).fill(false)
    if (props.editBtn) {
        let fetchedTargetedRes = filteredArr[0].targeted_Resources
        for (var k = 0; k < fetchedTargetedRes.length; k++) {
            for (var j = 0; j < targetedResources.length; j++) {
                if (userTargetResCheckedElems[j] == true) { continue }
                else { userTargetResCheckedElems[j] = (targetedResources[j] === fetchedTargetedRes[k]) }

            }
        }
    }
    const [TargetedResChkBox, setTargetedResChkBox] = useState(userTargetResCheckedElems);
    const handleTargetedResChkBoxOnChange = (position) => {
        const updatedCheckedState = TargetedResChkBox.map((item, index) =>
            index === position ? !item : item
        );
        setTargetedResChkBox(updatedCheckedState);
    }
    const submitForm = (event) => {
        event.preventDefault();
        // alert("form submitted");
        let SelectedClientSponsors = [];
        let SelectedFinController = [];
        let SelectedTargetedRes = [];
        for (var i = 0; i < ClientSponsorCheckedState.length; i++) {
            if (ClientSponsorCheckedState[i] === true) {
                SelectedClientSponsors.push(clientSponsors[i])
            }
        }
        for (var i = 0; i < clientFinanceController.length; i++) {
            if (clientFinanceController[i] === true) {
                SelectedFinController.push(clientFinController[i])
            }
        }
        for (var i = 0; i < TargetedResChkBox.length; i++) {
            if (TargetedResChkBox[i] === true) {
                SelectedTargetedRes.push(targetedResources[i])
            }
        }
        const DataToSend = {
            clientName: personName,
            projectName: projectName,
            clientSponsors: SelectedClientSponsors,
            clientFinCont: SelectedFinController,
            targetRes: SelectedTargetedRes,
            DocType: DocTypes,
            po_num: PO_number,
            po_amount: PO_amt,
            curr: CurrName,
            uploadedDoc: uploadFile,
            comments: remarks
        }
        console.log(DataToSend)
    }

    return (
        <div>
            <div className="container">
                <React.Fragment>
                    <CssBaseline />
                    <Container fixed>
                        <div className="outermostHeader">
                            <div><h2>PO/SOW</h2></div>
                            {(props.editBtn && editTglCheckedState) ?
                                <div>
                                    <Button variant="contained" color="success" type="submit" onClick={submitForm}>
                                        Update
                                    </Button>
                                </div> : <div></div>
                            }

                        </div>
                        <Box sx={{ bgcolor: 'white', height: '75vh', border: '2px solid grey', overflowY: 'scroll'
                        }}>
                            <div className="ProjectInfoHeader">
                                <div className="ProjectHeaderTitle">
                                    <h3>Project information</h3>
                                </div>
                                {props.editBtn ? <div><h5>STATUS</h5><strong>{filteredArr[0].status}</strong></div> : <div></div>}
                                {props.editBtn ?
                                    <div className="SaveButton">
                                        <strong className="editTxt">Edit mode</strong>
                                        <label className="switch">
                                            <input type="checkbox" checked={editTglCheckedState} onChange={handleEditTglChange} disabled={(filteredArr[0].status === "drafted" || filteredArr[0].status === "pending") ? false : true} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div> :
                                    <div className="SaveButton">
                                        <Button variant="contained" color="success" type="submit" onClick={submitForm}>
                                            Save
                                        </Button>
                                    </div>
                                }

                            </div>
                            <hr className="projectInfoSeperator" />

                            <div className="NameDropdowns" >
                                <div className="ClientDropdown">
                                    <label><strong>Client name</strong></label>
                                    <div>
                                        <FormControl sx={{ m: 1, width: 400 }}>
                                            <InputLabel id="demo-multiple-name-label">Names</InputLabel>
                                            <Select
                                                value={personName}
                                                onChange={handleClientChange}
                                                input={<OutlinedInput label="Name" />}
                                                MenuProps={MenuProps}
                                                disabled={props.editBtn && !editTglCheckedState ? true : false}
                                            >
                                                {names.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, personName, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="ProjectDropdown">
                                    <label><strong>Project name</strong></label>
                                    <div>
                                        <FormControl sx={{ m: 1, width: 400 }}>
                                            <InputLabel id="demo-multiple-name-label">Projects</InputLabel>
                                            <Select
                                                value={projectName}
                                                onChange={handleProjectChange}
                                                input={<OutlinedInput label="Name" />}
                                                MenuProps={MenuProps}
                                                disabled={props.editBtn && !editTglCheckedState ? true : false}
                                            >
                                                {projects.map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                        style={getStyles(name, personName, theme)}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            <div className="CheckBoxInputs">
                                <div>
                                    <div className="clientSponsorCBs">
                                        <h3>Client sponsors</h3>
                                        <ul className="">
                                            {clientSponsors.map((name, index) => {
                                                return (
                                                    <li key={index}>
                                                        <div className="">
                                                            <div className="">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`custom-checkbox-${index}`}
                                                                    name={name}
                                                                    value={name}
                                                                    disabled={props.editBtn && !editTglCheckedState ? true : false}
                                                                    onChange={() => handleClientOnChange(index)}
                                                                    checked={ClientSponsorCheckedState[index]}
                                                                />
                                                                <label>{name}</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div className="ClientFinContChkBoxs">
                                        <h3>Client Finance controller</h3>
                                        <ul className="">
                                            {clientFinController.map((name, index) => {
                                                return (
                                                    <li key={index}>
                                                        <div className="">
                                                            <div className="">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`custom-checkbox-${index}`}
                                                                    name={name}
                                                                    value={name}
                                                                    onChange={() => handleClientfinChkBoxOnChange(index)}
                                                                    checked={clientFinanceController[index]}
                                                                    disabled={props.editBtn && !editTglCheckedState ? true : false}
                                                                />
                                                                <label>{name}</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <div className="targetedResChkBoxs">
                                        <h3>Targeted Resources</h3>
                                        <ul className="">
                                            {targetedResources.map((name, index) => {
                                                return (
                                                    <li key={index}>
                                                        <div className="">
                                                            <div className="">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`custom-checkbox-${index}`}
                                                                    name={name}
                                                                    value={name}
                                                                    disabled={props.editBtn && !editTglCheckedState ? true : false}
                                                                    onChange={() => handleTargetedResChkBoxOnChange(index)}
                                                                    checked={TargetedResChkBox[index]}

                                                                />
                                                                <label>{name}</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="DocheaderTitle">
                                <h3>Document information</h3>
                            </div>
                            <hr className="projectInfoSeperator" />
                            <div className="DocInfoinputBoxesRowOne">
                                <div className="TypeDropdown">
                                    <label><strong>Type</strong></label>
                                    <div>
                                        <FormControl sx={{ m: 1, width: 250 }}>
                                            <InputLabel id="demo-multiple-name-label">Type</InputLabel>
                                            <Select value={typeName} onChange={handleTypeChange} input={<OutlinedInput label="Name" />} MenuProps={MenuProps} disabled={props.editBtn && !editTglCheckedState ? true : false}>
                                                {types.map((name) => (
                                                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>{name} </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="txtBox PoNoTxtBox">
                                    <label><strong>PO Number</strong></label>
                                    <div>
                                        <TextField id="outlined-basic" label="Enter PO Number" variant="outlined" value={PO_number} onChange={handlePoNumTxtBoxChange} disabled={props.editBtn && !editTglCheckedState ? true : false} />
                                    </div>
                                </div>
                                <div className="txtBox PoAmtTxtBox">
                                    <label><strong>PO Amount</strong></label>
                                    <div>
                                        <TextField id="outlined-basic" label="Enter PO Amount" variant="outlined" value={PO_amt} onChange={handlePOAmtTxtBoxChange} disabled={props.editBtn && !editTglCheckedState ? true : false} />
                                    </div>
                                </div>
                                <div className="CurrDropdown">
                                    <label><strong>Currency</strong></label>
                                    <div>
                                        <FormControl sx={{ m: 1, width: 250 }}>
                                            <InputLabel id="demo-multiple-name-label">Currency</InputLabel>
                                            <Select value={CurrName} onChange={handleCurrencyChange} input={<OutlinedInput label="Name" />} MenuProps={MenuProps} disabled={props.editBtn && !editTglCheckedState ? true : false}>
                                                {currencies.map((name) => (
                                                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>{name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="DocInfoInputBoxesRowTow">
                                <div className="txtBox PoAmtTxtBox">
                                    <label><strong>Document Name</strong></label>
                                    <div>
                                        <TextField sx={{ m: 1, width: 400 }} id="outlined-basic" label="uploaded Doc" variant="outlined" value={DocName} disabled={true} />
                                    </div>
                                </div>
                                <div className="DocTypeDropdown">
                                    <label><strong>Doc Type</strong></label>
                                    <div>
                                        <FormControl sx={{ m: 1, width: 300 }}>
                                            <InputLabel id="demo-multiple-name-label">Types</InputLabel>
                                            <Select value={DocTypes} onChange={handleDocTypesChange} input={<OutlinedInput label="Name" />} MenuProps={MenuProps} disabled={props.editBtn && !editTglCheckedState ? true : false}>
                                                {DocumentTypes.map((name) => (
                                                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>{name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="docInfoBottomFields">
                                <div className="SaveButton">
                                    {(props.editBtn && editTglCheckedState) || !props.editBtn ?
                                        <Button variant="contained" component="label" style={{ backgroundColor: '#f57c00', color: '#FFFFFF' }} disabled={props.editBtn && !editTglCheckedState ? true : false}>
                                            Upload File
                                            <input type="file" hidden onChange={handleUploadChange} />
                                        </Button>
                                        :
                                        <Button variant="contained" style={{ backgroundColor: '03A9F4', color: '#FFFFFF' }}>
                                            Download
                                        </Button>
                                    }
                                </div>
                                <div className="txtBox">
                                    <label><strong>Remarks/Comments</strong></label>
                                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidat autoComplete="off">
                                        <TextField
                                            id="outlined-multiline-static" label="Remarks" multiline rows={4} value={remarks} onChange={handleRemarksChange} disabled={props.editBtn && !editTglCheckedState ? true : false}
                                        />
                                    </Box>
                                </div>
                                {(props.editBtn && (filteredArr[0].status === "pending" || filteredArr[0].status === "drafted")) ?
                                    <Button variant="contained" component="label" style={{ backgroundColor: '03A9F4', color: '#FFFFFF' }} disabled={(editTglCheckedState ? true : false)}>
                                        Send For Approval
                                    </Button> : <div></div>
                                }
                            </div>
                        </Box>
                    </Container>
                </React.Fragment>
            </div>
        </div>
    )
}
