import React from 'react'
import { List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin'

const ChannelsList = (props) => {
    console.log(props) 
    return <List {...props} perPage={20}>
        <Datagrid>
            <TextField source='name' />
            <TextField source='common_id' />
            <TextField source='epg_enabled' />
            <TextField source='stream_url' />
            {/* <DateField source='publishedAt' />
            <EditButton basepath="/posts" />
            <DeleteButton basepath="/posts" /> */}
        </Datagrid>
    </List>
}

export default ChannelsList