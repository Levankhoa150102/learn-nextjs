const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
        date: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        time: date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    };
};

export default formatDate;