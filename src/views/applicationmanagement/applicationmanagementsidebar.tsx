import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { editSmallTrashBinIcon, plusIcon, saveIcon, smalltrashBinIcon } from "../../components/icons/icons";
import { setActiveScreenIndex, setBodyData, setSidebarModal, setSidebarData, sidebarItem } from "../../features/applicationSlice";
import { ApiHit } from "../../constants/Apihit";
import { Active, deleteApplicationSidebar, InActive, searchApplicationSidebar, updateApplicationSidebar } from "../../constants/constants";
import { ObjIsEmpty } from "../../utils/utils";
import CustomModal from "../../components/ui/modal/modal";
import CustomButton from "../../components/ui/forms/CustomButton";
import CustomInput from "../../components/ui/forms/CustomInput";
import { setApiJson, setApiJsonError } from "../../features/apireducer";
import toast from "react-hot-toast";
import CustomSwitch from "../../components/ui/forms/CustomSwitch";

const ApplicationManagementSideBar = () => {

    const ApplicationManagementReducer = useSelector((state: RootState) => state.application);
    const ApiReducer = useSelector((state: RootState) => state.ApiReducer);

    const dispatch = useDispatch()

    const [activeThreeDotIndex, setActiveThreeDotIndex] = useState(0)
    const [activeThreeDotId, setActiveThreeDotId] = useState('')

    useEffect(() => {
        if (ObjIsEmpty(ApplicationManagementReducer?.sidebarData) && ApplicationManagementReducer?.type !== '') {
            var json = {
                page: 1,
                limit: 10,
                search: {
                    type: ApplicationManagementReducer?.type
                }
            }
            ApiHit(json, searchApplicationSidebar).then(result => {
                if (result?.statusCode === 200) {
                    dispatch(setSidebarData(result))
                }
            })
        }
    }, [ApplicationManagementReducer])

    var height = window.innerHeight

    const onClick = () => {
        if (ApplicationManagementReducer.type !== '') {
            dispatch(setSidebarModal(true))
        } else {
            alert('select panel type')
        }
    }

    const onClickSideBarMenu = (i: number) => {
        dispatch(setActiveScreenIndex(i + 1))
        dispatch(setBodyData({}))
    }

    const onClickThreeDots = (i: number, ele: sidebarItem) => {
        setActiveThreeDotIndex(i)
        setActiveThreeDotId(ele?._id)
        const updatedJson = {
            ...ApiReducer?.apiJson,
            screenName: ele?.screenName,
        };
        dispatch(setApiJsonError({}))
        dispatch(setApiJson(updatedJson))
    }

    const onClickCloseThreeDots = () => {
        dispatch(setApiJsonError({}))
        setActiveThreeDotIndex(0)
        setActiveThreeDotId('')
    }

    const onUpdateClick = () => {
        if (ApiReducer?.apiJson?.screenName === ApplicationManagementReducer?.sidebarData?.data?.[activeThreeDotIndex - 1].screenName) {
            onClickCloseThreeDots()
        } else if (ApiReducer?.apiJson?.screenName === '') {
            dispatch(setApiJsonError({ screenName: 'Screen name is required' }))
        } else {
            var json = {
                _id: activeThreeDotId,
                screenName: ApiReducer?.apiJson?.screenName
            }
            ApiHit(json, updateApplicationSidebar).then(res => {
                if (res?.statusCode === 200) {
                    dispatch(setApiJsonError({}))
                    setActiveThreeDotIndex(0)
                    setActiveThreeDotId('')
                    dispatch(setSidebarData({}))
                    dispatch(setBodyData({}))
                    toast.success('Screen name updated successfully')
                }
            })
        }
    }

    const onDeleteSidebar = (id:string) => {
        var confirmation = window.confirm('Are you sure to delete menu')
        if (confirmation) {
            var json = {
                _id: id
            }
            ApiHit(json, deleteApplicationSidebar).then(res => {
                if (res?.statusCode === 204) {
                    dispatch(setApiJsonError({}))
                    setActiveThreeDotIndex(0)
                    setActiveThreeDotId('')
                    dispatch(setSidebarData({}))
                    dispatch(setBodyData({}))
                    toast.success('Screen deleted successfully')
                }
            })
        }
    }

    const onUpdateSidebarMenuStatus = (id:string,status:string) =>{
        var confirmation = window.confirm(`Are you sure to ${status} sidebar menu`)
        if (confirmation) {
            var json = {
                _id: id,
                status: status === Active ? InActive : Active
            }
            ApiHit(json, updateApplicationSidebar).then(res => {
                if (res.statusCode === 200) {
                    toast.success("Sidebar updated successfully")
                    dispatch(setSidebarData({}))
                }
            })
        }
    }

    return (
        <div className={`w-[20%] shadow-lg bg-lightGray rounded-lg`} style={{ height: height / 1.25 }}>
            <div className="flex justify-between text-sm p-3 border-b border-b-darkGray items-center">
                <p className="font-bold">List of Features</p>
                <i onClick={() => onClick()} className="text-sm cursor-pointer hover:text-white hover:bg-primary hover:w-5 hover:h-5 hover:rounded-full">{plusIcon}</i>
            </div>
            <div>
                {
                    ApplicationManagementReducer?.sidebarData?.data?.map((ele: sidebarItem, i: number) => {
                        return (
                            <div className="flex justify-between border-b border-b-darkGray items-center p-3">
                                <div key={i} onClick={() => onClickSideBarMenu(i)} className={`cursor-pointer text-sm ${ApplicationManagementReducer?.activeScreenIndex === i + 1 ? 'text-primary' : ''}`}>
                                    <p>{ele?.screenName}</p>
                                </div>
                                <div className="flex gap-4">
                                    <CustomSwitch onSwitch={()=>onUpdateSidebarMenuStatus(ele._id,ele.status)} type="1" name="status" checked={ele?.status===Active}/>
                                    <i onClick={() => onClickThreeDots(i + 1, ele)} className="hover:bg-white p-1 rounded-lg text-sm cursor-pointer">{editSmallTrashBinIcon}</i>
                                    <i onClick={() => onDeleteSidebar(ele?._id)} className="hover:bg-white p-1 rounded-lg text-sm cursor-pointer">{smalltrashBinIcon}</i>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                activeThreeDotIndex !== 0 &&
                <CustomModal onClickClose={() => onClickCloseThreeDots()} ModalTitle={'Edit Component'}>
                    <CustomInput title="Name" type="string" name='screenName' />
                    <div className="mt-5 flex gap-2">
                        <CustomButton className={`${ApiReducer?.apiJson?.screenName === ApplicationManagementReducer?.sidebarData?.data?.[activeThreeDotIndex - 1].screenName ? 'bg-lightGray border' : 'bg-primary'}`} titleClass={`${ApiReducer?.apiJson?.screenName === ApplicationManagementReducer?.sidebarData?.data?.[activeThreeDotIndex - 1].screenName ? 'text-black' : 'text-white'}`} iconClass={`${ApiReducer?.apiJson?.screenName === ApplicationManagementReducer?.sidebarData?.data?.[activeThreeDotIndex - 1].screenName ? 'text-black' : 'text-white'}`} icon={saveIcon} title="Update" onClick={() => onUpdateClick()} />
                    </div>
                </CustomModal>

            }
        </div>
    );
};

export default ApplicationManagementSideBar;
