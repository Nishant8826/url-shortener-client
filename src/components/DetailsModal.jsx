
const DetailsModal = ({ showModal, setShowModal, selectedItem, viewData, formatDateTime }) => {
    return (
        <>
            {
                showModal && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-gray-800 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-semibold mb-4">URL Details</h3>
                            <p><strong>ID:</strong> {viewData?.id}</p>
                            <hr className="my-4" />

                            <h4 className="text-lg font-semibold mb-2 mt-4">Analytics</h4>

                            <p><strong>Total Clicks:</strong> {selectedItem?.total || 0}</p>

                            <div className="mt-2">
                                <strong>All Access Times:</strong>
                                <ul className="list-disc list-inside ml-4 text-sm">
                                    {selectedItem?.last_access?.length > 0 ? (
                                        selectedItem?.last_access.map((entry, idx) => (
                                            <li key={idx}>
                                                {formatDateTime(entry.accessed_at)}
                                            </li>
                                        ))
                                    ) : (
                                        <li>None</li>
                                    )}
                                </ul>
                            </div>

                            <div className="mt-4">
                                <strong>Referrers:</strong>
                                <ul className="list-disc list-inside ml-4 text-sm">
                                    {selectedItem?.referrers?.length > 0 ? (
                                        selectedItem?.referrers.map((ref, idx) => (
                                            <li key={idx}>{ref.referrer}: {ref.count}</li>
                                        ))
                                    ) : (
                                        <li>None</li>
                                    )}
                                </ul>
                            </div>

                            <div className="mt-4">
                                <strong>IP Addresses:</strong>
                                <ul className="list-disc list-inside ml-4 text-sm">
                                    {selectedItem?.ip_groups?.length > 0 ? (
                                        selectedItem?.ip_groups.map((ip, idx) => (
                                            <li key={idx}>{ip.ip}: {ip.count}</li>
                                        ))
                                    ) : (
                                        <li>None</li>
                                    )}
                                </ul>
                            </div>


                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default DetailsModal