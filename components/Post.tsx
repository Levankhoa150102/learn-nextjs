import { useUserContext } from '@/context/UserContext';
import React, { useEffect } from 'react';
type PostProp = {
    getData: (type: string) => Promise<Response>;
}
function Post({ getData }: PostProp) {
    const [post, setPost] = React.useState();

    const {user} = useUserContext();

    useEffect(() => {
        getData("posts/1")
        .then(response => response.json())
        .then(setPost);
    }, [getData]);

    return (
        <div>
            {JSON.stringify(user)}
            {JSON.stringify(post)}
        </div>
    );
}

export default Post;