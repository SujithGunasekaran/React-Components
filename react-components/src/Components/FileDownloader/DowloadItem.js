import React, { Fragment, useState, useEffect, useRef } from 'react';
import { CancelLightIcon, CircleCheck, CircleCross } from '../../UI/Icon';
import { formatBytes } from '../../Util';
import axios from 'axios';

const DownloadItem = (props) => {

    // Props
    const { fileInfo, removeFileFromList } = props;

    // State
    const [downloadInfo, setDownloadInfo] = useState({
        progress: 0,
        completed: false,
        total: 0,
        loaded: 0
    });
    const [cancelDownload, setCancelDownload] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);

    // Ref
    const invokeDownloadFileRef = useRef();

    invokeDownloadFileRef.current = async (controller) => {
        const options = {
            onDownloadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                setDownloadInfo({
                    progress: Math.floor((loaded * 100) / total),
                    loaded,
                    total,
                    completed: false,
                });
            },
        };
        try {
            const response = await axios.get(fileInfo.file, {
                responseType: 'blob',
                signal: controller.signal,
                ...options
            });

            const url = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: response.headers["content-type"],
                })
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileInfo.filename);
            document.body.appendChild(link);
            link.click();

            setDownloadInfo(prevInfo => {
                let downloadInfo = {
                    ...prevInfo,
                    completed: true
                };
                return downloadInfo;
            })
            setOnSuccess(true);

            setTimeout(() => {
                removeFileFromList(fileInfo);
            }, 4000)

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        let controller = null;
        if (!cancelDownload) {
            controller = new AbortController()
            invokeDownloadFileRef.current(controller);
        }
        return () => {
            if (controller) {
                controller.abort();
            }
        }
    }, [cancelDownload])


    const handleCancel = () => {
        setCancelDownload(true);
        setTimeout(() => {
            removeFileFromList(fileInfo);
        }, 4000)
    }


    return (
        <Fragment>
            <div className='file_download_item'>
                <div className='file_download_item_header'>
                    <div className='file_download_item_heading'>{fileInfo.filename} - {cancelDownload ? 'Download Cancelled' : `${formatBytes(downloadInfo.loaded)} / ${formatBytes(downloadInfo.total)}`}</div>
                    {
                        onSuccess &&
                        <CircleCheck
                            cssClass={'file_download_success_icon'}
                        />
                    }
                    {
                        cancelDownload &&
                        <CircleCross
                            cssClass={'file_download_danger_icon'}
                        />
                    }
                    {
                        (!onSuccess && !cancelDownload) &&
                        <div onClick={() => handleCancel()}>
                            <CancelLightIcon
                                cssClass={'file_download_cancel_icon'}
                            />
                        </div>
                    }
                </div>
                {
                    downloadInfo.progress > 0 ?
                        <div className='file_download_item_loaded'>
                            <div className={`file_download_item_bar ${onSuccess && 'success'} ${cancelDownload && 'cancel'}`} style={{ width: `${downloadInfo.progress}%` }}></div>
                        </div>
                        :
                        <div className='file_download_item_text'>Initializing...</div>
                }

            </div>
        </Fragment>
    )

}


export default DownloadItem;
