import React, { useEffect, useState } from "react";
import { characterCheck, emailCheck, mobileNoCheck, amountCheck, characterCheckWithSpace } from "../../../../constants/validationConstants";
import { useLocation } from "react-router-dom";
const useFormChanges = (editFormData) => {
    const location = useLocation()
    let initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        dateOfBirth: "",
        address: "",
        metalType: "",
        product: "",
        productWeight: "",
        weightUnit: "",
        amount: "",
        amountPaid: "",
        amountPending: "",
        idCardType: "",
        idCardName: "",
        idCardNumber: "",
        referenceBy: "",
        referenceByNo: "",
        comment: ""
    }
    const [formData, setFormData] = useState({ ...initialFormData });
    const [formErrorData, setFormErrorData] = useState({ ...initialFormData });

    const idCardList = [
        "Voter ID",
        "Aadhar Card",
        "Driving licence",
        "Passport"
    ]

    useEffect(() => {
        if (editFormData) {
            setFormData(editFormData)
        } else {
            setFormData({ ...initialFormData })
        }
    }, [editFormData])

    const handleInputChange = (event) => {
        const getFormData = { ...formData }
        getFormData[event.target.name] = event.target.value;
        if (event.target.name === "amountPaid") {
            if (location.pathname.includes("EditCustomerInformation")) {
                const val = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value)
                const calculate = val  - parseInt(editFormData.amountPending);
                getFormData.amountPending = Math.abs( calculate );
            } else {
                if (getFormData.amount !== "") {
                    let calculate = getFormData.amount - event.target.value;
                    getFormData.amountPending = calculate;
                }
            }

        }
        if (event.target.name === "amount") {
            if (getFormData.amountPaid !== "") {
                let calculate = event.target.value - getFormData.amountPaid;
                getFormData.amountPending = calculate;
            }
        }
        if (event.target.name === "fileUpload") {
            getFormData.fileUpload = event.target.files[0];
        }

        if (event.target.name === "idCardType") {
            if (event.target.value !== "0") {
                const cardName = idCardList[event.target.value - 1];
                getFormData.idCardName = cardName
            }
        }

        setFormData(getFormData);
        const getFormErrorData = { ...formErrorData };
        getFormErrorData[event.target.name] = "";
        setFormErrorData(getFormErrorData);

    }

    const handleFormValidaton = () => {
        let isValErr = false
        let getFormErrorData = { ...formErrorData };
        if (formData.firstName === "") {
            getFormErrorData.firstName = "Please Enter First Name"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (!characterCheck.test(formData.firstName)) {
            getFormErrorData.firstName = "Please Enter Valid First Name"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.lastName === "") {
            getFormErrorData.lastName = "Please Enter Last Name"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (!characterCheck.test(formData.lastName)) {
            getFormErrorData.lastName = "Please Enter Valid Last Name"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.email === "") {
            getFormErrorData.email = "Please Enter Email Id"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (!emailCheck.test(formData.email)) {
            getFormErrorData.email = "Please Enter Valid Email Id"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.mobileNo === "") {
            getFormErrorData.mobileNo = "Please Enter Mobile Number"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (!mobileNoCheck.test(formData.mobileNo)) {
            getFormErrorData.mobileNo = "Please Enter Valid Mobile Number"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.mobileNo.length > 10 || formData.mobileNo.length < 10) {
            getFormErrorData.mobileNo = "Please Enter Valid Mobile Number"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.dateOfBirth === "") {
            getFormErrorData.dateOfBirth = "Please Enter Date of Birth"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.address === "") {
            getFormErrorData.address = "Please Enter Address"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.metalType === "") {
            getFormErrorData.metalType = "Please Select Metal Type"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.product === "") {
            getFormErrorData.product = "Please Enter Product"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.productWeight === "") {
            getFormErrorData.productWeight = "Please Enter Product Weight"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (!amountCheck.test(formData.productWeight)) {
            getFormErrorData.productWeight = "Please Enter Valid Product Weight"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.weightUnit === "") {
            getFormErrorData.weightUnit = "Please Enter Valid Unit"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.amount === "" || formData.amount === "0" || formData.amount === 0) {
            getFormErrorData.amount = "Please Enter Amount"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (!amountCheck.test(formData.amount)) {
            getFormErrorData.amount = "Please Enter Valid Amount"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.amountPaid === "" || formData.amountPaid === "0" || formData.amountPaid === 0) {
            getFormErrorData.amountPaid = "Please Enter Amount"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (!amountCheck.test(formData.amountPaid)) {
            getFormErrorData.amountPaid = "Please Enter Valid Amount"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (parseInt(formData.amountPaid) > parseInt(formData.amount)) {
            getFormErrorData.amountPaid = "Paid Amount Should Not Greater Than Amount"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.amountPending === "" || parseInt(formData.amountPending) < 0) {
            getFormErrorData.amountPending = "Please Enter Pending Amount"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (!amountCheck.test(formData.amountPending)) {
            getFormErrorData.amountPending = "Please Enter Valid Pending Amount"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.amountGivenDate === "") {
            getFormErrorData.amountGivenDate = "Please Enter Date on which Amount given"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.idCardType === "") {
            getFormErrorData.idCardType = "Please Select Choose Id Card Type"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.idCardNumber === "") {
            getFormErrorData.idCardNumber = "Please Enter Document Number"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.referenceBy !== "" && !characterCheckWithSpace.test(formData.referenceBy)) {
            getFormErrorData.referenceBy = "Please Enter Valid Reference By"
            setFormErrorData(getFormErrorData);
            return false;
        } else if (formData.referenceByNo !== "" && !mobileNoCheck.test(formData.referenceByNo)) {
            getFormErrorData.referenceByNo = "Please Enter Valid Reference Contact No."
            setFormErrorData(getFormErrorData);
            return false;
        } else {
            return true;
        }

        return isValErr;
    }

    return {
        formData,
        handleInputChange,
        handleFormValidaton,
        formErrorData
    }
}

export default useFormChanges